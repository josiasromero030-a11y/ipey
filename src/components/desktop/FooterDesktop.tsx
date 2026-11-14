import type {Store} from '../../hooks/useStore';
import {FooterCopyright,FooterContact,FooterExplore,FooterHelp,FooterIdentity,FooterLegal,TrademarkNote} from '../shared/FooterContent';

export function FooterDesktop({store}:{store:Store}){return <footer className="footer-desktop"><div className="shell"><div className="footer-columns"><FooterIdentity/><FooterExplore store={store}/><FooterHelp/><FooterLegal/><div className="footer-contact-group"><FooterContact/><p className="footer-copyright"><FooterCopyright/></p></div></div><TrademarkNote/></div></footer>}
