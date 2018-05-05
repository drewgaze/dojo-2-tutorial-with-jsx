import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { tsx } from '@dojo/widget-core/tsx';
import { theme, ThemedMixin } from '@dojo/widget-core/mixins/Themed';
import * as css from '../styles/worker.m.css';

export interface WorkerProperties {
	firstName?: string;
	lastName?: string;
	email?: string;
	timePerTask?: number;
	tasks?: string[];
}

const WorkerBase = ThemedMixin(WidgetBase);

@theme(css)
export default class Worker extends WorkerBase<WorkerProperties> {
	private _isFlipped = false;
	flip(): void {
		console.log('flipped');
		this._isFlipped = !this._isFlipped;
		this.invalidate();
	}
	private _renderFront() {
		const {
		firstName = 'firstName',
		lastName = 'lastName'
		} = this.properties;
		return (
			<div classes={ this.theme(css.workerFront) } onclick={this.flip}>
				<img classes={ this.theme(css.image) } src='https://dojo.io/tutorials/resources/worker.svg' />
				<div>
					<strong>{lastName}, {firstName}</strong>
				</div>
			</div>
		)
	}
	private _renderBack() {
		const {
			firstName = 'firstName',
			lastName = 'lastName',
			email = 'unavailable',
			timePerTask = 0,
			tasks = []
		} = this.properties;

		return (
			<div classes={ this.theme(css.workerBack) } onclick={ this.flip } >
				<img classes={ this.theme(css.imageSmall) } src='https://dojo.io/tutorials/resources/worker.svg' />
				<div classes={ this.theme(css.generalInfo) } >
					<div classes={ this.theme(css.label) } >Name</div>
					<div>{lastName}, {firstName}</div>
					<div classes={this.theme(css.label)}>Email</div>
					<div>{email}</div>
					<div classes={this.theme(css.label)}>Avg. Time per Task</div>
					<div>{`${timePerTask}`}</div> { /* dojo 2 won't render raw 0 for some reason */}
				</div>
				<div>
					<strong>Current Tasks</strong>
					<div>
						{tasks.map(task => {
							return <div classes={this.theme(css.task)}>{task}</div>
						})}
					</div>
				</div>
			</div>
		);
	}
	protected render() {
		return (
			<div classes={ this.theme([ css.worker, this._isFlipped ? css.reverse : null ]) }>
				{this._renderBack()}
				{this._renderFront()}
			</div>
		);
	}
}
