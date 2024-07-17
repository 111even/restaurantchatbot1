const sessions = {};

const menuItems = [
    { id: 2, name: 'Amala', price: 12 },
    { id: 3, name: 'Semo', price: 9 },
    { id: 4, name: 'Akpu', price: 9 },
    { id: 5, name: 'TuwonRice', price: 9.5 },
];

const handleMessage = (message, sessionId = 'default') => {
    if (!sessions[sessionId]) {
        sessions[sessionId] = { currentOrder: [], orderHistory: [] };
    }

    const session = sessions[sessionId];
    let reply = '';

    switch (message) {
        case '1':
            reply = 'Menu:\n';
            menuItems.forEach(item => {
                reply += `${item.id}. ${item.name} - $${item.price}\n`;
            });
            reply += 'Select the item number to add to your order.';
            break;
        case '99':
            if (session.currentOrder.length > 0) {
                session.orderHistory.push([...session.currentOrder]);
                session.currentOrder = [];
                reply = 'Order placed! Would you like to place a new order? Select 1 to Place an order.';
            } else {
                reply = 'No order to place. Select 1 to Place an order.';
            }
            break;
        case '98':
            if (session.orderHistory.length > 0) {
                reply = 'Order History:\n';
                session.orderHistory.forEach((order, index) => {
                    reply += `Order ${index + 1}:\n`;
                    order.forEach(item => {
                        reply += ` - ${item.name} - $${item.price}\n`;
                    });
                });
            } else {
                reply = 'No order history.';
            }
            break;
        case '97':
            if (session.currentOrder.length > 0) {
                reply = 'Current Order:\n';
                session.currentOrder.forEach(item => {
                    reply += ` - ${item.name} - $${item.price}\n`;
                });
            } else {
                reply = 'No current order.';
            }
            break;
        case '0':
            if (session.currentOrder.length > 0) {
                session.currentOrder = [];
                reply = 'Order cancelled.';
            } else {
                reply = 'No order to cancel.';
            }
            break;
        default:
            const itemId = parseInt(message);
            const item = menuItems.find(i => i.id === itemId);
            if (item) {
                session.currentOrder.push(item);
                reply = `${item.name} added to your order. Select 99 to checkout or add more items.`;
            } else {
                reply = 'Invalid selection. Please try again.';
            }
            break;
    }

    return reply;
};

module.exports = { handleMessage };
