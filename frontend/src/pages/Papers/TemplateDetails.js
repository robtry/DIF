import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//own
import CrudButton from '../../components/Tables/_shared/RUD_Button';
import TemplateControlsForm from '../../components/Forms/TemplateControlsForm';
import Loader from '../../components/Loader/PaginationLoader';

/** Este es el preview de la plantilla en modo tabla */

const TemplateDetails = (props) => {
	//console.log('Template Details:', props.data); //es un obj

	return (
		<Table celled structured>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell rowSpan="2">Campo</Table.HeaderCell>
					<Table.HeaderCell rowSpan="2">Tipo</Table.HeaderCell>
					<Table.HeaderCell rowSpan="2">Info Llenado</Table.HeaderCell>
					<Table.HeaderCell rowSpan="2">Detalles</Table.HeaderCell>
					<Table.HeaderCell colSpan="2">Controles</Table.HeaderCell>
				</Table.Row>
				<Table.Row>
					<Table.HeaderCell>Índice</Table.HeaderCell>
					<Table.HeaderCell>####</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{props.data.campos ? (
					props.data.campos.map((campo) => {
						//console.log(campo);
						return (
							<Table.Row textAlign="center" key={campo._id}>
								<Table.Cell>{campo.nombre}</Table.Cell>
								<Table.Cell>
									<p style={{ textTransform: 'capitalize' }}>{campo.tipo}</p>
								</Table.Cell>
								<Table.Cell>
									{campo.tipo === 'separador' || campo.tipo === 'constante' ? '---' : campo.pista}
								</Table.Cell>
								<Table.Cell>
									{campo.tipo === 'separador' ? (
										'---'
									) : campo.tipo === 'abierta' ? (
										campo.tipo_campo
									) : campo.tipo === 'constante' ? (
										campo.fuente
									) : campo.tipo === 'multi' || campo.tipo === 'cerrada' ? (
										<ul>{campo.opciones.map((op) => <li key={op._id}> {op.valor} </li>)}</ul>
									) : (
										campo.tipo_archivo
									)}
								</Table.Cell>
								<Table.Cell>{campo.index}</Table.Cell>
								<Table.Cell>
									<CrudButton
										deletePath={'templates/fields/' + props.data._id + '/' + campo._id}
										onDelete={campo.nombre}
										onEdit={TemplateControlsForm}
										refresh={props.loadData}
										item={campo}
										postPath={'templates/fields/' + props.data._id + '/' + campo._id}
									/>
								</Table.Cell>
							</Table.Row>
						);
					})
				) : (
					<Table.Row textAlign="center">
						<Table.Cell>
							<Loader />
						</Table.Cell>
					</Table.Row>
				)}
			</Table.Body>
		</Table>
	);
};

TemplateDetails.propTypes = {
	/** Info para rendear */
	data: PropTypes.object.isRequired,
	/** refetch data */
	loadData: PropTypes.func.isRequired
};

export default TemplateDetails;
