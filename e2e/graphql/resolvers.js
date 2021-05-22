const Query = {
  employee: () => ({
    id: 'some ID',
    name: 'Vladislav Boiko',
    jobTitle: 'Creator of Browser-Proxy',
    location: 'München / Remote',
  }),
};

const Employee = {
  skills: (employee, { limit }) => {
    return [
      {
        name: 'Web',
        description:
          'Frontend, backend, everything. Today mostly frontend (React, Redux, GraphQL,atomic design, angular etc.) Some time ago also Spring boot, Jhipster, mysql, redis, php with symphony, Wordpress, linux administration...',
      },
      {
        name: 'Soft skills',
        description:
          'Client facing and lead dev experience, certified scrum master.',
      },
      { name: 'DevOps', description: 'Jenkins, Docker, mvn release plugins' },
      {
        name: 'Fun',
        description:
          'Computer graphics, OpenGL, looking into WebGL. IoT with FreeRTOS, esp8266, rtl8710, arduino, raspberryPi.',
      },
      {
        name: 'Free time',
        description: 'Paragliding; Reading; Learning languages; Programming',
      },
      {
        name: 'Languages',
        description: 'Russian C2, English C2, German C2, 汉语 A1.',
      },
    ];
  },
};

const Mutation = {
  addEmployee: () => {
    return {
      id: '321',
      name: 'Vladislav Boiko',
      jobTitle:
        'Drop me a message/email, perhaps we can exchange a CV for a job description.',
      location: 'München / Remote',
    };
  },
};

module.exports = { Query, Employee, Mutation };
