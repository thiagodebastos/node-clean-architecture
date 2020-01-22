exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("contacts")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("contacts").insert([
        {
          first_name: "Cacilia",
          last_name: "Omar",
          email: "comar0@bing.com"
        },
        {
          first_name: "Izabel",
          last_name: "Benko",
          email: "ibenko1@sfgate.com"
        },
        {
          first_name: "Valaria",
          last_name: "Elcum",
          email: "velcum2@paypal.com"
        },
        {
          first_name: "Roth",
          last_name: "Clifforth",
          email: "rclifforth3@cnet.com"
        },
        {
          first_name: "Odie",
          last_name: "King",
          email: "oking4@ca.gov"
        },
        {
          first_name: "Boot",
          last_name: "Copnar",
          email: "bcopnar5@ezinearticles.com"
        },
        {
          first_name: "Mellisent",
          last_name: "Hambribe",
          email: "mhambribe6@digg.com"
        },
        {
          first_name: "Petronella",
          last_name: "Goldby",
          email: "pgoldby7@trellian.com"
        },
        {
          first_name: "Caren",
          last_name: "Yurlov",
          email: "cyurlov8@gmpg.org"
        },
        {
          first_name: "Jan",
          last_name: "Kares",
          email: "jkares9@marriott.com"
        }
      ]);
    });
};
