exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("contacts")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("contacts").insert([
        {
          id: 1,
          first_name: "Cacilia",
          last_name: "Omar",
          email: "comar0@bing.com"
        },
        {
          id: 2,
          first_name: "Izabel",
          last_name: "Benko",
          email: "ibenko1@sfgate.com"
        },
        {
          id: 3,
          first_name: "Valaria",
          last_name: "Elcum",
          email: "velcum2@paypal.com"
        },
        {
          id: 4,
          first_name: "Roth",
          last_name: "Clifforth",
          email: "rclifforth3@cnet.com"
        },
        {
          id: 5,
          first_name: "Odie",
          last_name: "King",
          email: "oking4@ca.gov"
        },
        {
          id: 6,
          first_name: "Boot",
          last_name: "Copnar",
          email: "bcopnar5@ezinearticles.com"
        },
        {
          id: 7,
          first_name: "Mellisent",
          last_name: "Hambribe",
          email: "mhambribe6@digg.com"
        },
        {
          id: 8,
          first_name: "Petronella",
          last_name: "Goldby",
          email: "pgoldby7@trellian.com"
        },
        {
          id: 9,
          first_name: "Caren",
          last_name: "Yurlov",
          email: "cyurlov8@gmpg.org"
        },
        {
          id: 10,
          first_name: "Jan",
          last_name: "Kares",
          email: "jkares9@marriott.com"
        }
      ]);
    });
};
