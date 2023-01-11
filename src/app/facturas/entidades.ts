export class Detalles{
    cantidad!: number;
    precioUnitario!: number;
    total!: number;
    servicioId!: number;
}

export class FacturaCabecera {
    fechaDeEmision!: Date;
    subtotal!: number;
    impuesto!: number;
    total!: number;
    clienteId!: number;
    usuarioId!: number;
    detalles!: Detalles[]
}