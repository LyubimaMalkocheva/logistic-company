export async function getAllEmployees() {
  return fetch("/employeeInCompany/getAllEmployeesInCompany", {
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

export async function getEmployeeById(id) {
  return fetch(`/employeeInCompany/findEmployeeById/${id}`, {
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

export async function getEmployeeDrivers() {
  return fetch(`/employeeInCompany/findDriverEmployees/`, {
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

export async function getEmployeeByPhone(phoneNumber) {
  return fetch(`/employeeInCompany/findEmployeeByPhoneNumb/${phoneNumber}`, {
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

export async function getEmployeeByEmail(email) {
  return fetch(`/employeeInCompany/findEmployeeByEmail/${email}`, {
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

export async function deleteEmployeeById(id) {
  return fetch(`/${id}`, {
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

export async function createEmployee(newEmployee) {
  return fetch("/employeeInCompany", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEmployee),
    // body: package,
  })
    .then((res) => res.json())
    .then((res) => {
      return { response: res };
    })
    .catch((error) => {
      return { error };
    });
}

export async function editEmployeeById(bodyData) {
  return fetch(`/${bodyData.dataId}`, {
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
