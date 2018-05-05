import { tsx } from '@dojo/widget-core/tsx';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

export default class Banner extends WidgetBase {
	protected render() {
		return <h1 title="I am a title!">Biz-E-Bodies</h1>
	}
}
