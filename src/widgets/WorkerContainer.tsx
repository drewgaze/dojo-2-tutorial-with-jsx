import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { tsx } from '@dojo/widget-core/tsx';
import Worker, { WorkerProperties } from './Worker';
import { theme, ThemedMixin } from '@dojo/widget-core/mixins/Themed';
import * as css from '../styles/workerContainer.m.css';

export interface WorkerContainerProperties {
	workerData?: WorkerProperties[];
}

const WorkerContainerBase = ThemedMixin(WidgetBase);

@theme(css)
export default class WorkerContainer extends WorkerContainerBase<WorkerContainerProperties> {
	protected render() {
		const {
			workerData = []
		} = this.properties;
		return (
			<div classes={this.theme(css.container)}>
				{workerData.map((worker, i) => 
					<Worker key={`worker-${i}`} {...worker} />
				)}
			</div>
		);
	}
}
