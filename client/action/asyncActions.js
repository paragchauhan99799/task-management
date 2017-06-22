import Request from 'axios';

function makeRequest(method, api, data) {
  return Request[method](api, data)
        .then(r => r);
}

exports.getAllMedia = () => {
    return makeRequest('get', '/task/getall')
    .then(response => {
        return response.data;
    })
}

exports.createTask = (data) => {
    console.log('createtask asyncActions', data);
    return makeRequest('post', '/task/add', data)
    .then(response => {
        return response.data;
    })
}

exports.deleteTask = (taskId) => {
    console.log('deletetask asyncActions');
    return makeRequest('delete', `/task/delete/${taskId}`)
    .then(response => {
        return response.data;
    })
}