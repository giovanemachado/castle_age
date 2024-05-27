export const fetchData = async (
  token: string = "",
  route: string,
  method: string = "GET",
  body?: any,
) => {
  const options: any = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${route}`,
    options,
  );

  const contentType = response.headers.get("content-type");

  let data;

  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  }

  const status = response.status;

  return { status, data };
};
