export async function getAllCustomers() {
  return fetch("/customer/getAllCustomers", {
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

export async function deleteCustomerById(id) {
  return fetch(`/customer/deleteCustomerById/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("res");
      // return {
      //   response: {
      //     message: res.message,
      //     dataId: Number(res.dataId),
      //   },
      // };
    })
    .catch((error) => {
      return { error };
    });
}

export async function createCustomer(newCustomer) {
  return fetch("/customer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCustomer),
  })
    .then((res) => res.json())
    .then((res) => {
      return { response: res };
    })
    .catch((error) => {
      return { error };
    });
}

export async function editCustomerById(bodyData) {
  return fetch(`/customer/update/${bodyData.dataId}`, {
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

export async function getCustomerByEmail(email) {
  return fetch(`/customer/findCustomerByEmail/${email}`, {
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
