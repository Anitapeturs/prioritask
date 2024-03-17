
const translations = (req, res, next) => {

    const language = {
        en: {
          settingsTitle: 'Settings for',
          save: 'Save',
          deleteUser: 'Delete User',
          newUsername: 'New Username',
          logOut: 'Log Out',
          Saturday: "Saturday's plans",
          Sunday: "Sunday's plans",
          Monday: "Monday's plans",
          Tuesday: "Tuesday's plans",
          Wednesday: "Wednesday'plans",
          Thursday: "Thursday's plans",
          Friday: "Friday's plans",

        },
        no: {
          settingsTitle: 'Innstillinger for',
          save: 'Lagre',
          deleteUser: 'Slett Bruker',
          newUsername: 'Nytt Brukarnavn',
          logOut: 'Logg Ut',
          Saturday: 'Lørdags plan',
          Sunday: "Søndags plan",
          Monday: "Mandags plan",
          Tuesday: "Tirsdags plan",
          Wednesday: "Onsdags plan",
          Thursday: "Torsdags plan",
          Friday: "Fredags plan",
        },
        is: {
          settingsTitle: 'Stillingar fyrir',
          save: 'Vista',
          deleteUser: 'Eyða notanda',
          newUsername: 'Nýtt Notandanafn',
          logOut: 'Útskrá',
          Saturday: 'Laugardags áætlun',
          Sunday: "Sunnudags áætlun",
          Monday: "Mánudags áætlun",
          Tuesday: "Þriðjudags áætlun",
          Wednesday: "Miðvikudags áætlun",
          Thursday: "Fimmtudags áætlun",
          Friday: "Föstudags áætlun",
        }
      };

      req.language = language;

      next();
};

export default translations;