import React from 'react';
//own
import Constant from '../../components/Forms/FormatControls/Constant';
import Separator from '../../components/Forms/FormatControls/Separator';

/** Es contruida con todos los campos desabilitados */

const FormatPreview = (props) => {
	console.log(props);

	return (
		<React.Fragment>
			<Separator title='Sección 1'/>
			<Constant
				label='Campo 1'
				value='okas dokas'
			/>
			<Constant
				label='Campo 2'
				value='cancion'
			/>
			<Constant
				label='Campo 1'
				value='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales sapien vitae erat placerat tincidunt. Phasellus tincidunt nibh sed nunc semper, eget consequat lacus elementum. Sed efficitur arcu sed neque faucibus malesuada at nec massa. Quisque dapibus augue nec turpis mattis porttitor. In hac habitasse platea dictumst. Sed metus lacus, aliquam vel nibh id, semper tincidunt ante. Integer accumsan fermentum risus id ornare. Maecenas a lectus non velit molestie fermentum. Suspendisse sed tempor massa.'
			/>
			<Separator
				title='Seccion de Archivos'
			/>
			<Constant
				label='Acta de Nacimiento'
				file='path/para/el/file'
			/>
		</React.Fragment>
	);
};

export default FormatPreview;
