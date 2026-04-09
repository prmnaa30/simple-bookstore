import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bookstore API Documentation',
      version: '1.0.0',
      description: 'Dokumentasi API untuk project simulasi Mini Sprint',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'auth',
          description: 'Login via API terlebih dahulu, cookie akan tersimpan otomatis di browser.',
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

export const swaggerSpec = swaggerJSDoc(options)
