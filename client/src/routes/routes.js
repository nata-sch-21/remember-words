import Home from '../components/Home';
import SelectLanguages from '../components/SelectLanguages';
import Dictionaries from '../components/Dictionaries';
import Words from '../components/Words';
import Results from '../components/Results';
import NotFound from '../components/NotFound';

export default {
  '/': {
    header: 'Let\'s remember the words',
    path: '/',
    component: Home,
  },
  '/start': {
    header: 'Select languages',
    path: '/start',
    component: SelectLanguages,
  },
  '/dictionaries': {
    header: 'Dictionaries',
    path: '/dictionaries',
    component: Dictionaries,
  },
  '/dictionaries/:id': {
    header: 'Remembering words',
    path: '/dictionaries/:id',
    component: Words,
  },
  '/results': {
    header: 'Results',
    path: '/results',
    component: Results,
  },
  '/404': {
    header: 'Results',
    path: '/404',
    component: NotFound,
  },
};
