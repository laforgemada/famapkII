<?php

namespace App\Security;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use KnpU\OAuth2ClientBundle\Security\Authenticator\OAuth2Authenticator;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class GoogleAuthenticator extends OAuth2Authenticator
{
    private $clientRegistry;
    private $entityManager;
    private $userRepository;

    public function __construct(ClientRegistry $clientRegistry, EntityManagerInterface $entityManager, UserRepository $userRepository)
    {
        $this->clientRegistry = $clientRegistry;
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
    }

    public function supports(Request $request): ?bool
    {
        // Assurez-vous que cette route est bien configurée dans votre fichier routes.yaml
        return $request->attributes->get('_route') === 'connect_google_check';
    }

    public function authenticate(Request $request): Passport
    {
        $client = $this->clientRegistry->getClient('google');
        $accessToken = $this->fetchAccessToken($client);

        return new SelfValidatingPassport(
            new UserBadge($accessToken->getToken(), function() use ($accessToken, $client) {
                $googleUser = $client->fetchUserFromToken($accessToken);
                $email = $googleUser->getEmail();

                $user = $this->userRepository->findOneBy(['email' => $email]);

                if (!$user) {
                    $user = new User();
                    $user->setEmail($email);
                    // On définit un username par défaut
                    $user->setUsername($googleUser->getName() ?? explode('@', $email)[0]);
                    $user->setRoles(['ROLE_USER']);
                    $user->setIsActif(true); 
                    $user->setPassword(password_hash(bin2hex(random_bytes(16)), PASSWORD_BCRYPT));
                    
                    $this->entityManager->persist($user);
                    $this->entityManager->flush();
                }

                return $user;
            })
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        /** @var User $user */
        $user = $token->getUser();

        // Même mécanisme de token que la connexion classique (voir ApiLoginController::login) :
        // sans ça, la PWA n'aurait aucun moyen d'appeler les routes /api/... après un login Google.
        $apiToken = bin2hex(random_bytes(32));
        $user->setApiToken($apiToken);
        $this->entityManager->flush();

        // On passe le nom ET le token dans l'URL pour que votre JavaScript puisse les lire (localStorage)
        $username = $user->getUsername();
        // Fallback sur apokalypsy.com si la variable d'env FRONTEND_URL n'est pas définie,
        // pour ne jamais planter même si le .env est incomplet.
        $frontendUrl = $_ENV['FRONTEND_URL'] ?? 'https://apokalypsy.com';
        $targetUrl = $frontendUrl . '/utilisateur/espace_personnel.html?user=' . urlencode($username) . '&token=' . urlencode($apiToken);
        return new RedirectResponse($targetUrl);
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        // Redirection en cas d'erreur vers votre site réel
        return new RedirectResponse('https://apokalypsy.com/login/connexion.html?error=google_failed');
    }
}
