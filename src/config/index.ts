interface Config {
  API_URL: string;
  APP_NAME: string;
}

const config: Config = {
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  APP_NAME: import.meta.env.VITE_APP_NAME || "Library Management System",
};

export { config };
