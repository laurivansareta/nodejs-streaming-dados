exports.createInsertQuery = (tablename, obj) => {
    const insert = 'INSERT INTO ' + tablename;
    const keys = Object.keys(obj);
    const dollar = keys.map(function (item, idx) { return '$' + (idx + 1); });
    const values = Object.keys(obj).map(function (k) { return obj[k]; });
    
    return {
        sql: insert + '(' + keys + ')' + ' VALUES(' + dollar + ')',
        params: values
    }
}

exports.createUpdateQuery = (tablename, idName, idValue, values) => {
    const args = Object.values(values);
    const keys = Object.keys(values).join(', ');
    const argKeys = Object.keys(values).map((obj,index) => {
        return "$"+(index+1)
    }).join(', ');

    return {
        sql: "UPDATE " + tablename + " SET (" + keys + ") = (" + argKeys + ") WHERE " + idName + " = " + idValue,
        params: args
    }
}