import BlogPost from "@/components/BlogPost";
import iboPlayerGuide from "@/assets/blog/ibo-player-guide.jpg";
import iboStep1 from "@/assets/blog/ibo-step-1-find.jpg";
import iboStep2 from "@/assets/blog/ibo-step-2-settings.jpg";
import iboStep3 from "@/assets/blog/ibo-step-3-downloader.jpg";
import iboStep4 from "@/assets/blog/ibo-step-4-app.jpg";
import iboStep5 from "@/assets/blog/ibo-step-5-playlist.jpg";
import logo from "@/assets/iptv-quebec-premium-logo.png";

const StepImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative my-6 rounded-xl overflow-hidden border border-border">
    <img src={src} alt={alt} width={800} height={450} loading="lazy" className="w-full h-auto object-cover" />
    <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-lg">
      <img src={logo} alt="" width={50} height={20} className="h-5" aria-hidden="true" />
    </div>
  </div>
);

const IBOPlayerGuide = () => {
  const content = (
    <>
      <p className="lead">
        <strong>IBO Player</strong> est l'un des meilleurs lecteurs de streaming vidéo qui permet aux utilisateurs de diffuser 
        la télévision en ligne sur leur fournisseur Internet ou toute autre source Internet sur vos appareils 
        <strong> Android</strong>, <strong>Firestick</strong>, <strong>Smart TV</strong>, <strong>iOS</strong> et <strong>MacOS</strong>.
      </p>

      <h2>Guide d'Installation IBO Player Pro</h2>

      <h3>Pour Tous les Appareils Android : Téléphones, TV, Box</h3>
      <p>
        Allez simplement sur le <strong>Play Store</strong> et recherchez <strong>IBO Pro Player</strong>.
      </p>
      <p>
        <a href="https://play.google.com/store/apps/details?id=com.ibopro.player" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Lien direct vers le Play Store
        </a>
      </p>

      <h3>Pour Tous les Appareils iOS : iPhone, Mac, Apple TV</h3>
      <p>
        Allez simplement sur l'<strong>App Store</strong> et recherchez <strong>IBO Pro Player</strong>.
      </p>
      <p>
        <a href="https://apps.apple.com/app/ibo-pro-player/id6449647925" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Lien direct vers l'App Store
        </a>
      </p>

      <h3>Pour les TV LG</h3>
      <p>
        Allez simplement sur <strong>LG Apps</strong> et recherchez <strong>IBO Pro Player</strong>.
      </p>
      <p>
        <a href="https://us.lgappstv.com/main/tvapp/detail?appId=1209143" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Lien direct vers LG Apps Store
        </a>
      </p>

      <h3>Pour les TV Samsung</h3>
      <p>
        Allez simplement sur <strong>Samsung Apps</strong> et recherchez <strong>IB Player Pro</strong>.
      </p>

      <h3>Pour les Appareils Roku</h3>
      <p>
        Naviguez simplement vers <strong>Roku</strong> et recherchez l'application IBO Player Pro.
      </p>
      <p>
        <a href="https://channelstore.roku.com/en-gb/details/11b5250d70e6ec61bf516bb30bec398f/ibo-player-pro" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Lien direct vers le Roku Store
        </a>
      </p>

      <h2>Guide d'Installation IBO Player Pro sur FireStick</h2>
      <p>
        Puisque nous allons installer en sideload sur FireStick, nous devons d'abord activer l'option de sécurité 
        "Apps de sources inconnues" dans les paramètres FireStick.
      </p>

      <h3>Étape 1 : Accéder à la Recherche</h3>
      <p>
        Vous devez être sur l'écran d'accueil de FireStick. Sélectionnez <strong>FIND</strong> (RECHERCHER).
      </p>
      <StepImage src={iboStep1} alt="Fire TV Stick écran d'accueil - Sélectionner FIND" />

      <h3>Étape 2 : Ouvrir la Recherche</h3>
      <p>
        Maintenant, cliquez sur <strong>Search</strong> (Rechercher).
      </p>

      <h3>Étape 3 : Télécharger Downloader</h3>
      <p>
        Dans la fenêtre de recherche, cherchez l'application appelée <strong>Downloader</strong>. 
        C'est l'application par laquelle nous allons installer IBO PLAYER sur FireStick.
      </p>
      <StepImage src={iboStep3} alt="Application Downloader sur Fire TV Stick" />

      <h3>Étape 4 : Accéder aux Paramètres</h3>
      <p>
        Après avoir installé l'application Downloader, retournez à l'écran d'accueil et sélectionnez <strong>Settings</strong> (Paramètres).
      </p>

      <h3>Étape 5 : My Fire TV</h3>
      <p>
        Dans les Paramètres, accédez à l'option <strong>My Fire TV</strong> et ouvrez-la.
      </p>

      <h3>Étape 6 : Options Développeur</h3>
      <p>
        Maintenant, la prochaine option à laquelle vous accéderez est <strong>Developer Options</strong> (Options développeur).
      </p>
      <StepImage src={iboStep2} alt="Fire TV Stick Developer Options - Install Unknown Apps" />
      <p className="bg-muted/50 p-4 rounded-lg border border-border">
        <strong>Note :</strong> Si vous ne voyez pas les Options développeur, allez dans <strong>Settings</strong> → <strong>My Fire TV</strong> → <strong>About</strong>. 
        Maintenant, sélectionnez <strong>Fire TV Stick</strong> et cliquez dessus 7 fois pour activer les Options développeur.
      </p>

      <h3>Étape 7 : Installer les Apps Inconnues</h3>
      <p>
        Sur la fenêtre qui s'ouvre ensuite, cliquez sur <strong>Install Unknown Apps</strong> (Installer les apps inconnues).
      </p>
      <p className="bg-muted/50 p-4 rounded-lg border border-border">
        <strong>Note :</strong> Si vous avez encore l'ancienne version de l'interface FireStick, cliquez sur "Apps from Unknown Sources" (Apps de sources inconnues).
      </p>

      <h3>Étape 8 : Activer pour Downloader</h3>
      <p>
        Activez l'option <strong>ON</strong> pour l'application Downloader.
      </p>

      <p>
        Une fois que vous avez activé les Apps de <strong>Sources Inconnues</strong>, vous pouvez commencer à installer 
        l'application <strong>IBO Player</strong> sur <strong>FireStick</strong>. Voici les étapes :
      </p>

      <h3>Étape 9 : Ouvrir Downloader</h3>
      <p>
        Vous pouvez maintenant ouvrir l'<strong>application Downloader</strong>. Quelques messages s'afficheront lors de 
        la première exécution. Ignorez-les en choisissant les options appropriées. Lorsque l'écran suivant de l'application 
        apparaît, cliquez sur la zone de texte.
      </p>

      <h3>Étape 10 : Entrer l'URL</h3>
      <p>
        Maintenant, tapez simplement le <strong>chemin/URL</strong> suivant dans cette fenêtre popup avec le clavier à l'écran :
      </p>
      <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 my-4">
        <code className="text-primary font-mono">https://shorturl.at/hsMW1</code>
        <p className="text-sm mt-2">(code downloader : <strong>834339</strong>)</p>
      </div>
      <p>Cliquez <strong>OK</strong></p>

      <h3>Étape 11 : Installer l'APK</h3>
      <p>
        Attendez que l'APK <strong>IBO Player</strong> soit <strong>téléchargé</strong> sur votre appareil FireStick.
      </p>
      <p>
        L'application Downloader lancera automatiquement l'APK <strong>IBO Player</strong> pour vous. 
        Continuez et cliquez sur <strong>Install</strong> (Installer).
      </p>

      <h2>Comment Utiliser l'Application IBO Pro Player</h2>

      <h3>Étape 1 : Obtenir les Identifiants</h3>
      <p>
        Une image popup avec l'<strong>adresse Mac</strong> et la <strong>clé d'appareil</strong> apparaîtra. 
        Cliquez sur <strong>Continue</strong> (Continuer).
      </p>
      <StepImage src={iboStep4} alt="IBO Player Pro interface principale" />

      <h3>Étape 2 : Accéder à la Page d'Accueil</h3>
      <p>
        La page d'accueil de l'application apparaîtra. Cliquez sur <strong>Change Playlist</strong> (Changer la playlist).
      </p>

      <h3>Étape 3 : Ajouter une Playlist</h3>
      <p>
        Cliquez sur <strong>Add Playlist</strong> (Ajouter une playlist).
      </p>
      <StepImage src={iboStep5} alt="Configuration playlist IPTV - M3U et Xtream Codes" />

      <div className="bg-accent/10 p-6 rounded-lg border border-accent/20 my-6">
        <h4 className="font-semibold mb-3">Note : Vous pouvez ajouter votre playlist en utilisant l'une des deux méthodes suivantes :</h4>
        
        <p className="mb-4">
          <strong>Première méthode :</strong> Ajoutez votre lien M3U, vérifiez les informations dans votre boîte de réception/spam 
          pour les <strong>Détails de connexion de votre compte d'abonnement</strong>.
        </p>
        
        <p>
          <strong>Deuxième méthode :</strong> Sélectionnez l'onglet <strong>Xtream-Codes-API</strong> et vérifiez les informations 
          dans votre boîte de réception/spam pour les <strong>Détails de connexion de votre compte d'abonnement</strong>.
        </p>
      </div>

      <h3>Étape 4 : Finaliser la Configuration</h3>
      <p>
        Sélectionnez <strong>Add Playlist</strong>. Assurez-vous que la playlist est connectée, retournez à la page d'accueil 
        et cliquez sur <strong>Reload</strong> (Recharger).
      </p>

      <p className="text-xl font-semibold text-primary mt-6">
        Profitez de vos <strong>chaînes en direct</strong>, <strong>films</strong> et <strong>séries</strong> !
      </p>

      <div className="bg-muted p-6 rounded-lg border border-border mt-8">
        <h3 className="text-lg font-semibold mb-3">Besoin d'Aide ?</h3>
        <p>
          Si vous avez encore des problèmes, veuillez prendre une photo de votre adresse Mac et de votre clé d'appareil 
          avec votre téléphone et envoyez-la à notre équipe de support.
        </p>
      </div>

      <h2>Avantages d'IBO Player Pro</h2>
      <ul>
        <li><strong>Multi-plateforme :</strong> Disponible sur Android, iOS, Smart TV, Firestick et plus</li>
        <li><strong>Interface intuitive :</strong> Navigation facile et design moderne</li>
        <li><strong>Support M3U et Xtream Codes :</strong> Compatible avec les deux formats de playlist</li>
        <li><strong>Qualité HD/4K :</strong> Streaming de haute qualité selon votre connexion</li>
        <li><strong>EPG intégré :</strong> Guide des programmes électronique inclus</li>
        <li><strong>Favoris et historique :</strong> Sauvegardez vos chaînes préférées</li>
        <li><strong>Mises à jour régulières :</strong> Application constamment améliorée</li>
      </ul>
    </>
  );

  return (
    <BlogPost
      title="Guide Complet d'Installation IBO Player Pro 2025"
      excerpt="Tutoriel étape par étape pour installer et configurer IBO Player Pro sur tous vos appareils : Android, iOS, Fire TV Stick, Smart TV Samsung, LG et Roku. Configuration IPTV facile."
      category="Tutoriel"
      date="21 Décembre 2025"
      readTime="12 min"
      image={iboPlayerGuide}
      content={content}
    />
  );
};

export default IBOPlayerGuide;
