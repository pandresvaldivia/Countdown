import { $form } from './selectors.js';
import { validateDate } from './functions.js';

$form.addEventListener('submit', validateDate);
