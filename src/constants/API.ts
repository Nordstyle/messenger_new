const createApiLink = (url: string) => (
  location: string,
  point: string = "/api/"
) => url + location + point;

// DEV
const serverDev = "https://api-lht.stecpoint.ru";
const createDevRoute = createApiLink(serverDev);

// DEV NEW
const serverDevNew = "https://api-mto-dev.stecpoint.ru";
const createDevNewRoute = createApiLink(serverDevNew);

// GSPK
const serverGspk = "https://api.lht.spb.ru";
const createGspkRoute = createApiLink(serverGspk);

// MTO STAGE
const serverStage = "https://api-mto-stage.lahta-spb.ru";
const createStageRoute = createApiLink(serverStage);

// MTO PREPROD
const serverPreprod = "https://api-mto-test.lahta-spb.ru";
const createPreprodRoute = createApiLink(serverPreprod);

// MTO PROD
const serverProd = "https://api-mto.lahta-spb.ru";
const createProdRoute = createApiLink(serverProd);

const locations = {
  filestorage: "/filestorage-service",
  messenger: "/messenger-service",
};

const defaultDevRoutes = {
  MESSENGER_API: createDevRoute(locations.messenger, "/messenger"),
  CHAT_API: createDevRoute(locations.messenger),
};

const generateApi = () => {
  switch (process.env.REACT_APP_CONTUR) {
    case "lahta":
      switch (process.env.REACT_APP_BUILD) {
        case "gspk": {
          return {
            FILESTORAGE_API: createGspkRoute(locations.filestorage),
            MESSENGER_API: createGspkRoute(locations.messenger, "/messenger"),
          };
        }
        case "prod": {
          return {
            FILESTORAGE_API: createProdRoute(locations.filestorage),
            MESSENGER_API: createProdRoute(locations.messenger, "/messenger"),
          };
        }
        case "preprod": {
          return {
            FILESTORAGE_API: createPreprodRoute(locations.filestorage),
            MESSENGER_API: createPreprodRoute(
              locations.messenger,
              "/messenger"
            ),
          };
        }
        case "stage": {
          return {
            FILESTORAGE_API: createStageRoute(locations.filestorage),
            MESSENGER_API: createStageRoute(locations.messenger, "/messenger"),
          };
        }
        case "devnew": {
          return {
            FILESTORAGE_API: createDevNewRoute(locations.filestorage),
            MESSENGER_API: createDevNewRoute(locations.messenger, "/messenger"),
          };
        }
        default:
          return defaultDevRoutes;
      }
    default:
      return defaultDevRoutes;
  }
};

export const API = generateApi();
