const EventEmitter = require('events');

const delivery = new EventEmitter();

async function cook(orderDetails) {
  const { name, units } = orderDetails;

  console.log(`🔥 Cooking ${units} units of ${name}\n`);
}

async function deliver(addressDetails) {
  const { street, number } = addressDetails;

  console.log('📲 Calling the motoboy...');
  console.log(`🛵 Sending your order to ${street} Number ${number}`);
}

delivery
  .on('order', (order) => {
    const { orderData, addressData } = order;

    console.log('⌛ Processing order...\n');

    cook(orderData)
      .then(() => {
        delivery.emit('deliver', addressData);
      })
      .catch(err => console.error(err));
  })

  .on('deliver', addressDetails => {
    deliver(addressDetails)
      .then(() => {
        console.log('\nBon Appétit 🍴')
      })
      .catch(err => console.error(err));
  })


const order = {
  orderData: {
    name: 'Super Cheese Pizza',
    units: 3,
  },
  addressData: {
    street: 'Rua Dom Pedro II',
    number: 76,
  }
}


delivery.emit('order', order);
