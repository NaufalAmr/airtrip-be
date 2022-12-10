const { Flight, Airplane, Airport } = require("../models");
const { Op } = require("sequelize");
const airportRequiredAttributes = [
  "id",
  "iata",
  "name",
  "address",
  "country_code",
];

async function findFlights(departureDate, from, to, flightClass) {
  try {
    return await Flight.findAll({
      where: {
        departure: {
          [Op.gte]: departureDate,
        },
        from,
        to,
        class: flightClass,
      },
      include: [
        {
          model: Airport,
          as: "from_airport",
          attributes: airportRequiredAttributes,
        },
        {
          model: Airport,
          as: "to_airport",
          attributes: airportRequiredAttributes,
        },
        { model: Airplane },
      ],
    });
  } catch (error) {
    throw error;
  }
}

async function findReturnFlights(
  returnFlightDate,
  arrivalDate,
  from,
  to,
  flightClass
) {
  try {
    return await Flight.findAll({
      where: {
        departure: {
          [Op.gte]: returnFlightDate,
          [Op.gt]: arrivalDate,
        },
        from: to,
        to: from,
        class: flightClass,
      },
      include: [
        {
          model: Airport,
          as: "from_airport",
          attributes: airportRequiredAttributes,
        },
        {
          model: Airport,
          as: "to_airport",
          attributes: airportRequiredAttributes,
        },
        { model: Airplane },
      ],
    });
  } catch (error) {
    throw error;
  }
}
module.exports = {
  findFlights,
  findReturnFlights,
};