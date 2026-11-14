import type {Store} from '../../hooks/useStore';
import {FooterBottom,FooterContact,FooterExplore,FooterIdentity} from '../shared/FooterContent';

export function FooterMobile({store}:{store:Store}){return <footer className="footer-mobile"><div className="shell"><div className="footer-columns"><FooterIdentity/><FooterExplore store={store} mobile/><FooterContact/></div><FooterBottom/></div></footer>}
