
import { applyBindings } from 'knockout';

// The good stuff
import RootViewModel from './viewmodels/Root';

// All components
import './components/fend-sidebar';
import './components/fend-sidebar-list';


// Root binding for the application
applyBindings(new RootViewModel());
