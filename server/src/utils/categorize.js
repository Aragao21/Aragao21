export function categorizeTransaction(type) {
  switch (type) {
    case 'pix_send':
      return 'Transferência';
    case 'pix_receive':
      return 'Recebimento';
    case 'recharge':
      return 'Telefone';
    case 'payment':
    default:
      return 'Contas';
  }
}
