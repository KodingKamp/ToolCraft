exports.GetItem = async (id) => {
    try {
        let resp = await fetch(`http://localhost:8000/api/item/get/${id}`, {method: 'GET'});

        let item = await resp.json();

        return {
            id: item.id,
            name: item.name,
            quantity: item.quantity
        };
    } catch (e) {
        console.error("An error occured when fetching item.", e);
    }
}

exports.GetInitial = async _ => {
    try {
        let resp = await fetch('http://localhost:8000/api/item/get/initial', {method: 'GET'});

        let listOfItems = await resp.json();
        let items = [];
        
        for(let item of listOfItems) {
            items.push({
                id: item.id,
                name: item.name,
                quantity: item.quantity
            })
        }

        return items;
    } catch (error) {
        console.error("An error occured when fetching initial items.", error)
    }
}

exports.CombineItems = async _ => {
    try {
        let resp = await fetch('http://localhost:8000/api/item/get/2');

        let item = await resp.json();

        return {
            id: item.id,
            name: item.name,
            quantity: item.quantity
        };
    } catch (error) {
        console.error("An error occured when fetching initial items.", error)
    }
}

exports.Dismantle = async id => {
    try {
        let resp = await fetch(`http://localhost:8000/api/item/get/dismantle/${id}`);
        if (resp.status === 500) {
            return;
        }

        let listOfItems = await resp.json();
        let items = [];
        
        for(let item of listOfItems) {
            items.push({
                id: item.id,
                name: item.name,
                quantity: item.quantity
            })
        }

        return items;
    } catch (error) {
        console.error("An error occured when fetching initial items.", error)
    }
}