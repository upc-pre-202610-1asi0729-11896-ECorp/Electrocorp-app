import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api-config';
import { BaseAssembler } from '../assemblers/base.assembler';
import { BaseResource } from '../resources/base.resource';
import { BaseResponse } from '../responses/base.response';

export abstract class BaseApiService<
  TEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse<number>
> {
  protected readonly apiBaseUrl = API_BASE_URL;

  protected constructor(
    protected readonly http: HttpClient,
    protected readonly endpointPath: string,
    protected readonly assembler: BaseAssembler<TEntity, TResource, TResponse>
  ) {}

  findAll(): Observable<TResponse[]> {
    return this.http.get<TResponse[]>(`${this.apiBaseUrl}/${this.endpointPath}`);
  }

  findById(id: number): Observable<TResponse> {
    return this.http.get<TResponse>(`${this.apiBaseUrl}/${this.endpointPath}/${id}`);
  }

  create(resource: TResource): Observable<TResponse> {
    return this.http.post<TResponse>(`${this.apiBaseUrl}/${this.endpointPath}`, {
      id: Date.now(),
      ...resource,
    });
  }

  update(id: number, resource: Partial<TResource>): Observable<TResponse> {
    return this.http.patch<TResponse>(
      `${this.apiBaseUrl}/${this.endpointPath}/${id}`,
      resource
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${this.endpointPath}/${id}`);
  }
}
