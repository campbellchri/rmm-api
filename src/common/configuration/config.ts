import * as process from 'process';

export default () => ({
    basePath: process.env.BASE_PATH,
    appUrl: process.env.APP_URL,
    port: parseInt(process.env.PORT || process.env.APP_PORT, 10) || 4000,
    enableSwagger: process.env.ENABLE_SWAGGER !== 'false',
    logLevel: 'trace',
    firebase: {
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    },
    // googleMaps: {
    //     apiKey: process.env.GOOGLE_MAPS_API_KEY,
    // },
    jwt: {
        secret:
            process.env.JWT_SECRET ||
            'b8f287fec8c5bb8e267783e31640af3eeb1bb073e1b318fed4b782e25489afdfab321a56b708952e14e13ace98abfda1f92d2a7c32b2a2bd8bd6fce198c926e9',
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },
    swagger: {
        enable: process.env.ENABLE_SWAGGER !== 'false',
        title: process.env.SWAGGER_TITLE || 'Auth Service',
        description:
            process.env.SWAGGER_DESCRIPTION ||
            'This is the documentation of Auth Service API',
        version: process.env.SWAGGER_VERSION || '1.0',
    },
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE,
        synchronize: process.env.DB_SYNCHRONIZE === 'true',
        logging: process.env.DB_LOGGING,
    },
    cloudinary: {
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    },
    // twilio: {
    //     accountSid: process.env.TWILIO_ACCOUNT_SID,
    //     authToken: process.env.TWILIO_AUTH_TOKEN,
    //     contentSid: process.env.TWILIO_CONTENT_SID,
    //     fromWhatsAppNumber: process.env.TWILIO_PHONE_NUMBER,
    // },
    // smsbox: {
    //     username: process.env.SMSBOX_USERNAME,
    //     password: process.env.SMSBOX_PASSWORD,
    //     customerId: process.env.SMSBOX_CUSTOMER_ID,
    //     senderText: process.env.SMSBOX_SENDER_TEXT,
    // },
    // aws: {
    //     region: process.env.AWS_REGION,
    //     auth: {
    //         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    //     },
    //     upload: {
    //         photos: {
    //             bucket: process.env.AWS_BAZAR_VGA_BUCKET,
    //         },
    //     },
    // },
});
