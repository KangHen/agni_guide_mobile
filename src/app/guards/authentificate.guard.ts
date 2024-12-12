import { CanActivateFn, createUrlTreeFromSnapshot, RedirectCommand, UrlTree } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
export const authentificateGuard: CanActivateFn = async (route, state) => {
  const user = await Preferences.get({ key: 'user' });

  if (user.value !== null) {
    return true;
  }
  
  const urlTree = createUrlTreeFromSnapshot(route, ['login']);

  return new RedirectCommand(urlTree);
};
