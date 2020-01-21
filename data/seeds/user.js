exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("user").insert([
        {
          id: 1,
          first_name: "Cacilia",
          last_name: "Omar",
          email: "comar0@bing.com",
          password: "MU7HQd"
        },
        {
          id: 2,
          first_name: "Izabel",
          last_name: "Benko",
          email: "ibenko1@sfgate.com",
          password: "j75HzuoZTtNX"
        },
        {
          id: 3,
          first_name: "Valaria",
          last_name: "Elcum",
          email: "velcum2@paypal.com",
          password: "iPqTTtz"
        },
        {
          id: 4,
          first_name: "Roth",
          last_name: "Clifforth",
          email: "rclifforth3@cnet.com",
          password: "kZYVCQ"
        },
        {
          id: 5,
          first_name: "Odie",
          last_name: "King",
          email: "oking4@ca.gov",
          password: "9Mg49tJ"
        },
        {
          id: 6,
          first_name: "Boot",
          last_name: "Copnar",
          email: "bcopnar5@ezinearticles.com",
          password: "f5LbhAn"
        },
        {
          id: 7,
          first_name: "Mellisent",
          last_name: "Hambribe",
          email: "mhambribe6@digg.com",
          password: "kfERFz"
        },
        {
          id: 8,
          first_name: "Petronella",
          last_name: "Goldby",
          email: "pgoldby7@trellian.com",
          password: "vy9nFyz6K"
        },
        {
          id: 9,
          first_name: "Caren",
          last_name: "Yurlov",
          email: "cyurlov8@gmpg.org",
          password: "Okpvtn2"
        },
        {
          id: 10,
          first_name: "Jan",
          last_name: "Kares",
          email: "jkares9@marriott.com",
          password: "1s8WEM74"
        }
      ]);
    });
};
