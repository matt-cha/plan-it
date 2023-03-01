module.exports = function formatDate(string) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric' };
  return new Date(string).toLocaleDateString('en-US', options);
};
