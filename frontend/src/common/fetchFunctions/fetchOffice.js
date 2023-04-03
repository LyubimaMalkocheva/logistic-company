export async function getAllOffices() {
  return fetch("/office/getAllOffices", {
    method: "GET",
  })
    .then((res) => res.json())

    .then((res) => {
      return { response: res };
    })
    .catch((error) => {
      return { error };
    });
}

export async function getOfficeById(id) {
  return fetch(`/office/findOfficeById/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      return { response: res };
    })
    .catch((error) => {
      return { error };
    });
}