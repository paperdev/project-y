'use client';

import React from 'react';
import TemplatePage from '@/components/template/_page';
import { IonItem, IonList, IonNavLink } from '@ionic/react';
import DeveloperPage from './developer';
import LicensesPage from './licenses';
import TermsPage from './terms';
import PolicyPage from './policy';
import BookmarksPage from './bookmarks';

const aboutList = [
  {
    name: 'Bookmarks',
    component: BookmarksPage
  },
  {
    name: 'Terms of Service',
    component: TermsPage
  },
  {
    name: 'Privacy Policy',
    component: PolicyPage
  },
  {
    name: 'Licenses',
    component: LicensesPage
  },
  {
    name: 'Developer',
    component: DeveloperPage
  },
]

export default function ListPage() {
  return (
    <>
      <TemplatePage>
        <IonList>
          {
            aboutList.map((item, index) => {
              return (
                <IonNavLink key={index} routerDirection="forward" component={() => <item.component />}>
                  <IonItem detail={true} >{item.name}</IonItem>
                </IonNavLink>
              )
            })
          }
        </IonList>
      </TemplatePage>
    </>
  )
}