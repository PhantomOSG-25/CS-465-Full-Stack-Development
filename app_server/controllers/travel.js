const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
};

const travel = async function (req, res, next) {
  try {
    const apiBaseUrl = process.env.API_BASE_URL
      || `${req.protocol}://${req.get('host')}/api`;
    const tripsEndpoint = `${apiBaseUrl}/trips`;
    const response = await fetch(tripsEndpoint, options);
    if (!response.ok) {
      throw new Error(`Trip service returned ${response.status}`);
    }

    const payload = await response.json();
    const trips = Array.isArray(payload) ? payload : [];
    const message = trips.length ? null : 'No trips are currently available.';

    res.render('travel', { title: 'Explore trips', trips, message });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  travel
};
