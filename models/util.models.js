exports.createInsertQuery = (tablename, values) => {
    const insert = 'INSERT INTO ' + tablename;
    const keys = Object.keys(values);
    const dollar = keys.map(function (item, idx) { return '$' + (idx + 1); });
    const params = Object.keys(values).map(function (k) { return values[k]; });
    
    return {
        sql: insert + '(' + keys + ')' + ' VALUES(' + dollar + ') RETURNING id;',
        params: params
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