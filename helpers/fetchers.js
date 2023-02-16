const fetcher = async (...args) => {
  const res = await fetch(...args);

  return res.json();
};

const fetcherWithUser = async (args) => {
  const [url, token] = args;
  const res = await fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  });

  return res.json();
};

export { fetcher, fetcherWithUser };
