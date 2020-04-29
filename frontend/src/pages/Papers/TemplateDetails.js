import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//own
import RudButton from '../../components/Tables/_shared/RUD_Button';
import TemplateControlsForm from '../../components/Forms/TemplateControlsForm';

/** Este es el preview de la plantilla en modo tabla */

const TemplateDetails = (props) => {
	return (
		<Table celled structured>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell rowSpan="2">Campo</Table.HeaderCell>
					<Table.HeaderCell rowSpan="2">Tipo</Table.HeaderCell>
					<Table.HeaderCell rowSpan="2">Info Llenado</Table.HeaderCell>
					<Table.HeaderCell rowSpan="2">Tipo/Opciones</Table.HeaderCell>
					<Table.HeaderCell colSpan="2">Controles</Table.HeaderCell>
				</Table.Row>
				<Table.Row>
					<Table.HeaderCell>Índice</Table.HeaderCell>
					<Table.HeaderCell>####</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				<Table.Row textAlign="center">
					<Table.Cell>Informe Psicológico</Table.Cell>
					<Table.Cell>Separador</Table.Cell>
					<Table.Cell>---</Table.Cell>
					<Table.Cell>---</Table.Cell>
					<Table.Cell> 0 </Table.Cell>
					<RudButton
						id={'1/<idfield>'}
						onDelete="Observaciones"
						onEdit={TemplateControlsForm}
						refresh={props.loadData}
					/>
				</Table.Row>
				<Table.Row textAlign="center">
					<Table.Cell>Fecha</Table.Cell>
					<Table.Cell>Abierta</Table.Cell>
					<Table.Cell>Fecha en la que se llena el formato</Table.Cell>
					<Table.Cell>Fecha</Table.Cell>
					<Table.Cell> 0 </Table.Cell>
					<RudButton
						id={'1/<idfield>'}
						onDelete="Fecha"
						onEdit={TemplateControlsForm}
						refresh={props.loadData}
					/>
				</Table.Row>
				<Table.Row textAlign="center">
					<Table.Cell>No. Expediente</Table.Cell>
					<Table.Cell>Consistente</Table.Cell>
					<Table.Cell>---</Table.Cell>
					<Table.Cell>Expediente</Table.Cell>
					<Table.Cell> 0 </Table.Cell>
					<RudButton
						id={'1/<idfield>'}
						onDelete="Observaciones"
						onEdit={TemplateControlsForm}
						refresh={props.loadData}
					/>
				</Table.Row>
				<Table.Row textAlign="center">
					<Table.Cell>Metodología</Table.Cell>
					<Table.Cell>Cerrada</Table.Cell>
					<Table.Cell>Descripción sobre las técnicas</Table.Cell>
					<Table.Cell>
						<ul>
							<li>Observación</li>
							<li>Entrevista Semietructurada</li>
						</ul>
					</Table.Cell>
					<Table.Cell> 0 </Table.Cell>
					<RudButton
						id={'1/<idfield>'}
						onDelete="Observaciones"
						onEdit={TemplateControlsForm}
						refresh={props.loadData}
					/>
				</Table.Row>

				<Table.Row textAlign="center">
					<Table.Cell>Derechos Vulnerados</Table.Cell>
					<Table.Cell>Multivalor</Table.Cell>
					<Table.Cell>---</Table.Cell>
					<Table.Cell>
						<ul>
							<li>Derecho A</li>
							<li>Derecho B</li>
							<li>Derecho C</li>
						</ul>
					</Table.Cell>
					<Table.Cell> 0 </Table.Cell>
					<RudButton
						id={'1/<idfield>'}
						onDelete="Observaciones"
						onEdit={TemplateControlsForm}
						refresh={props.loadData}
					/>
				</Table.Row>

				<Table.Row textAlign="center">
					<Table.Cell>Observaciones</Table.Cell>
					<Table.Cell>Abierta</Table.Cell>
					<Table.Cell>Resaltar la información sobre...</Table.Cell>
					<Table.Cell>Texto Largo</Table.Cell>
					<Table.Cell> 0 </Table.Cell>
					<RudButton
						id={'1/<idfield>'}
						onDelete="Observaciones"
						onEdit={TemplateControlsForm}
						refresh={props.loadData}
					/>
				</Table.Row>

				<Table.Row textAlign="center">
					<Table.Cell>Archivos</Table.Cell>
					<Table.Cell>Separador</Table.Cell>
					<Table.Cell>---</Table.Cell>
					<Table.Cell>---</Table.Cell>
					<Table.Cell> 0 </Table.Cell>
					<RudButton
						id={'1/<idfield>'}
						onDelete="Observaciones"
						onEdit={TemplateControlsForm}
						refresh={props.loadData}
					/>
				</Table.Row>

				<Table.Row textAlign="center">
					<Table.Cell>Foto</Table.Cell>
					<Table.Cell>Archivo</Table.Cell>
					<Table.Cell>Adjuntar foto del NNA</Table.Cell>
					<Table.Cell>Imagen</Table.Cell>
					<Table.Cell> 0 </Table.Cell>
					<RudButton
						id={'1/<idfield>'}
						onDelete="Observaciones"
						onEdit={TemplateControlsForm}
						refresh={props.loadData}
					/>
				</Table.Row>

			</Table.Body>
		</Table>
	);
};

TemplateDetails.propTypes = {
	/** Info para rendear */
	data: PropTypes.array.isRequired,
	/** refetch data */
	loadData: PropTypes.func.isRequired
};

export default TemplateDetails;
