import React from 'react';
import { MockupCategory } from './types';
import { FlagIcon, ShirtIcon, BuildingIcon, CreditCardIcon, PresentationIcon, BookOpenIcon, TvIcon, SmartphoneIcon, LaptopIcon, BusIcon, PoleBannerIcon, LinkedinIcon, InstagramIcon } from './components/Icons';

export const MOCKUP_CATEGORIES: MockupCategory[] = [
  // FIX: Replaced JSX syntax with React.createElement to resolve TypeScript parsing errors.
  { name: 'Waving Flag', prompt: 'a waving flag', icon: React.createElement(FlagIcon) },
  { name: 'Hoodie', prompt: 'a person wearing a hoodie', icon: React.createElement(ShirtIcon) },
  { name: 'T-shirt', prompt: 'a person wearing a t-shirt', icon: React.createElement(ShirtIcon) },
  { name: 'Park Pole Banner', prompt: 'a banner on a pole in a park', icon: React.createElement(PoleBannerIcon) },
  { name: 'Business Card', prompt: 'a business card on a wooden table', icon: React.createElement(CreditCardIcon) },
  { name: 'Stand Banner', prompt: 'a standing banner at a conference', icon: React.createElement(PresentationIcon) },
  { name: 'Magazine', prompt: 'an open page of a magazine', icon: React.createElement(BookOpenIcon) },
  { name: 'Billboard', prompt: 'a large city billboard at dusk', icon: React.createElement(BuildingIcon) },
  { name: 'Bus Stop Ad', prompt: 'an advertisement panel at a bus stop', icon: React.createElement(BusIcon) },
  { name: 'Laptop Screen', prompt: 'the screen of a modern laptop in a cafe', icon: React.createElement(LaptopIcon) },
  { name: 'Smartphone', prompt: 'the screen of a smartphone being held', icon: React.createElement(SmartphoneIcon) },
  { name: 'TV Screen', prompt: 'a large TV screen in a living room', icon: React.createElement(TvIcon) },
  { name: 'Linkedin Ad', prompt: 'a Linkedin ad post on a laptop screen', icon: React.createElement(LinkedinIcon) },
  { name: 'Instagram Story', prompt: 'an Instagram story on a smartphone screen', icon: React.createElement(InstagramIcon) },
];