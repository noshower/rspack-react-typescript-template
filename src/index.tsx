import { createRoot } from 'react-dom/client';
import css from './index.module.less';

function NavigationBar() {
  return <h1 className={css.title}>Hello from React!</h1>;
}

const domNode = document.getElementById('root')!;
const root = createRoot(domNode);
root.render(<NavigationBar />);
