// Generouted, changes to this file will be overriden
/* eslint-disable */

import {components, hooks, utils} from '@generouted/react-router/client'

export type Path =
  | `///`
  | `/account`
  | `/account/login`
  | `/account/register`
  | `/cart`
  | `/checkout/:step?`
  | `/dashboard`
  | `/dashboard/analytics`
  | `/dashboard/products`
  | `/orders/:id`
  | `/products/:category/:id/:slug?`
  | `/products/:category?`

export type Params = {
  '/checkout/:step?': { step?: string }
  '/orders/:id': { id: string }
  '/products/:category/:id/:slug?': { category: string; id: string; slug?: string }
  '/products/:category?': { category?: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
