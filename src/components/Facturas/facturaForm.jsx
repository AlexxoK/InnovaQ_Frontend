import { useEffect, useState } from 'react';
import {useFacturas} from '../../shared/hooks'

const facturaForm = ({ reservacionId, onClose }) => {
  const {handlePostFactura} = useFacturas();
  const [factura, setFactura] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generar = async () => {
      try {
        const form = {
          reservacionId: reservacionId
        }
        const res = await handlePostFactura(form);
        console.log(res)
        setFactura(res.data.factura);
      } catch (err) {
        setError('❌ Error al generar la factura.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    generar();
  }, [reservacionId]);

  if (isLoading) {
    return (
      <div className="modal-backdrop fade show d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
        <div className="spinner-border text-light" role="status"></div>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <div className="modal-backdrop fade show" />
        <div className="modal d-block" style={{ zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Error</h5>
                <button type="button" className="btn-close" onClick={onClose} />
              </div>
              <div className="modal-body text-center">
                <p>{error}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!factura) return null;

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }} onClick={onClose} />

      <div className="modal fade show d-block" style={{
        zIndex: 1050,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '95%',
        maxWidth: '800px'
      }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header bg-primary text-white rounded-top-4">
              <h5 className="modal-title">Factura Generada</h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose} />
            </div>

            <div className="modal-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h4 className="text-primary">Hotel {factura.hotel?.name}</h4>
                  <p><small className="text-muted">Dirección:</small> {factura.hotel?.direccion}</p>
                  <p><small className="text-muted">Categoría:</small> {factura.hotel?.categoria}</p>
                </div>
                <div className="col-md-6 text-end">
                  <h5 className="text-primary">Factura #{factura._id}</h5>
                  <p><small className="text-muted">Fecha:</small> {new Date(factura.fechaPago).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="border-top pt-3 mb-3">
                <h6 className="text-secondary">Cliente</h6>
                <p><strong>{factura.user?.name} {factura.user?.surname}</strong></p>
                <p><strong>Email:</strong> {factura.user?.email}</p>
                <p><strong>Teléfono:</strong> {factura.user?.phone}</p>
              </div>

              <div className="border-top pt-3 mb-3">
                <h6 className="text-secondary">Habitaciones</h6>
                <ul className="list-group">
                  {factura.reservacion?.habitaciones?.map((h, i) => (
                    <li key={i} className="list-group-item">
                      🛏️ {h.type} - Q{h.price} x {h.quantity} = <strong>Q{h.price * h.quantity}</strong>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-top pt-3 mb-3">
                <h6 className="text-secondary">Eventos</h6>
                <ul className="list-group">
                  {factura.reservacion?.eventos?.map((e, i) => (
                    <li key={i} className="list-group-item">
                      🎉 {e.tipoSala} - Q{e.precio}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-top pt-3">
                <h5 className="text-end text-primary">Total: Q{factura.total}</h5>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
              <button className="btn btn-primary" onClick={() => window.print()}>Imprimir</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFacturaModal;