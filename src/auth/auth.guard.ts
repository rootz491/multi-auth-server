import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import apiKeys from './api-keys';

@Injectable()
export class APIGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredApiIdentifier = this.reflector.get<string>(
      'ApiIdentifier',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();

    //  If API Identifier is not provided, then deny the access to API
    if (!requiredApiIdentifier) {
      console.log('WARNING: API Identifier is not provided');
      return false;
    }

    const requestPair = apiKeys.find(
      (pair) => pair.identifier === requiredApiIdentifier,
    );

    //  If API Identifier is incorrect, then deny the access to API
    if (!requestPair) {
      return false;
    }

    const requiredApiHeader = requestPair.header.toLowerCase();
    const requiredApiKey = requestPair.value;

    const inputApiKey = request.headers[requiredApiHeader]?.toString();

    //  If API Key is incorrect, then deny the access to API
    if (requiredApiKey !== inputApiKey) {

      return false;
    }

    return true;
  }
}

//  This decorator will be used to decorate the routes that require specific permissions.
export const ApiIdentifier = (identifier: string) =>
  SetMetadata('ApiIdentifier', identifier);
