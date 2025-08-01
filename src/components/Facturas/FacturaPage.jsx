import Navbar from '../Layout/Navbar.jsx';
import { useEffect, useState } from 'react';
import { useFacturas } from '../../shared/hooks/useFacturas';
// import './factura.css'
import { 
  UserIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
  HomeIcon,
  CalendarIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  BuildingStorefrontIcon,
  TicketIcon,
  ArrowPathIcon,
  FolderIcon
} from '@heroicons/react/24/outline';

const FacturasPage = () => {
    const { handleGetFacturas,handleGetFacturaByUser, facturas, isLoading } = useFacturas();
    const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);

    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            const userRole = userData?.user?.role;

            if (userRole === 'USER') {
            handleGetFacturaByUser();
        } else {
            handleGetFacturas();
        }
    } catch (error) {
        console.error('Error al obtener rol de usuario:', error);
        handleGetFacturaByUser();
    }
    }, []);




  const toggleDetalle = (id) => {
    setFacturaSeleccionada(prev => (prev === id ? null : id));
  };

  return (
    <div className="facturas-container">
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 facturas-card p-4">
            <h2 className="text-primary text-center mb-4 facturas-title">
              <DocumentTextIcon style={{ fontSize: '2.5rem', verticalAlign: 'middle', marginRight: '10px', width: '2.5rem', height: '2.5rem', display: 'inline' }} />
              Facturas
            </h2>

            {isLoading && facturas.length === 0 ? (
              <div className="d-flex justify-content-center py-5 spinner-container">
                <div className="text-primary" style={{ fontSize: '3rem' }}>
                  <ArrowPathIcon style={{ fontSize: 'inherit', animation: 'spin 1.5s linear infinite', width: '3rem', height: '3rem' }} />
                </div>
              </div>
            ) : facturas.length === 0 ? (
              <div className="empty-state">
                <FolderIcon className="empty-state-icon" style={{ width: '4rem', height: '4rem' }} />
                <p className="h5 text-muted">No hay facturas disponibles</p>
                <p className="text-muted mt-2">Actualmente no se encontraron facturas en el sistema</p>
              </div>
            ) : (
              <div className="list-group">
                {facturas.map((fac) => (
                  <div
                    key={fac._id}
                    className={`factura-item ${facturaSeleccionada === fac._id ? 'factura-open' : ''}`}
                  >
                    <div 
                      className="factura-header"
                      onClick={() => toggleDetalle(fac._id)}
                    >
                      <div>
                        <h5 className="d-flex align-items-center">
                          <UserIcon className="factura-icon" style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                          {fac.user?.name} {fac.user?.surname}
                        </h5>
                        <div className="d-flex align-items-center mt-2">
                          <EnvelopeIcon className="factura-icon" style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                          <span>{fac.user?.email}</span>
                        </div>
                        <div className="d-flex align-items-center mt-2">
                          <CurrencyDollarIcon className="factura-icon" style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                          <span className="factura-total">Q{fac.total}</span>
                        </div>
                        <div className="d-flex align-items-center mt-2">
                          <CalendarDaysIcon className="factura-icon" style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                          <span className="factura-date">
                            {new Date(fac.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="factura-arrow">
                        <ChevronDownIcon style={{ width: '1.5rem', height: '1.5rem' }} />
                      </div>
                    </div>

                    {facturaSeleccionada === fac._id && (
                      <div className="factura-details">
                        <h6 className="factura-section-title">
                          <DocumentTextIcon className="factura-icon" style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                          Detalle de la Factura
                        </h6>

                        <div className="d-flex align-items-center">
                          <BuildingStorefrontIcon className="factura-icon" style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                          <strong>Reservación:</strong> 
                          <span className="ms-2">
                            {fac.reservacion?.nombreHotel?.name || 'Sin hotel'}
                          </span>
                        </div>

                        <h6 className="factura-section-title mt-4">
                          <HomeIcon className="factura-icon" style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                          Habitaciones
                        </h6>
                        <ul className="factura-list">
                          {fac.reservacion?.habitaciones?.map((hab, i) => (
                            <li key={i}>
                              {hab.type} - Q{hab.price}
                            </li>
                          ))}
                        </ul>

                        <h6 className="factura-section-title mt-4">
                          <TicketIcon className="factura-icon" style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                          Eventos
                        </h6>
                        <ul className="factura-list">
                          {fac.reservacion?.eventos?.map((ev, i) => (
                            <li key={i}>
                              {ev.tipoSala || 'Evento sin tipo'}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacturasPage;