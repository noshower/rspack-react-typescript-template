import { createRoot } from 'react-dom/client';
import css from './index.module.less';
import { Button } from './ui/button/button';

function NavigationBar() {
  return (
    <div className={css.content}>
      <h1 className={css.title}>Hello from React!</h1>
      <Button primary label="Greet" size="large" onClick={() => window.alert('hello')} />
    </div>
  );
}

const domNode = document.getElementById('root')!;
const root = createRoot(domNode);
root.render(<NavigationBar />);
