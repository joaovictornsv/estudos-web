import EventEmitter from 'events';

const delivery = new EventEmitter();

interface IOrderData {
  name: string,
  units: number,
}

interface IAddressData {
  street: string,
  number: number,
}

interface IOrderDetails {
  orderData: IOrderData,
  addressData: IAddressData
}

async function cook(orderData: IOrderData) {
  const { name, units } = orderData;

  console.log(`🔥 Cooking ${units} units of ${name}\n`);
}

async function deliver(addressData: IAddressData) {
  const { street, number } = addressData;

  console.log('📲 Calling the motoboy...');
  console.log(`🛵 Sending your order to ${street} Number ${number}`);
}

delivery
  .on('order', async (order: IOrderDetails) => {
    const { orderData, addressData } = order;

    console.log('⌛ Processing order...\n');

    await cook(orderData)
    delivery.emit('deliver', addressData);
  })

delivery
  .on('deliver', async (addressData: IAddressData) => {
    await deliver(addressData)
    console.log('\nBon Appétit 🍴')
  })


const order: IOrderDetails = {
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
