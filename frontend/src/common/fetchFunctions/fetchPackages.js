export async function getAllPackages() {
  return fetch("/package/getPackages", {
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

export async function deletePackageById(id) {
  return fetch(`/package/deletePackageById/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("res", res);
      return {
        response: {
          message: res.message,
          dataId: Number(res.dataId),
        },
      };
    })
    .catch((error) => {
      return { error };
    });
}

export async function createPackage(newPackage) {
  return fetch("/package", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPackage),
  })
    .then((res) => res.json())
    .then((res) => {
      return { response: res };
    })
    .catch((error) => {
      return { error };
    });
}

export async function editPackageById(bodyData) {
  return fetch(`/package/update/${bodyData.dataId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  })
    .then((res) => res.json())
    .then((res) => {
      return { response: res };
    })
    .catch((error) => {
      return { error };
    });
}
