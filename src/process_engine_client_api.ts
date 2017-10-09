import {ExecutionContext, IIamService} from '@essential-projects/core_contracts';
import {IMessageBusService} from '@essential-projects/messagebus_contracts';
import {IProcessable, IProcessEngineClientApi, IProcessInstance} from './interfaces';
import {ProcessInstance} from './process_instance';

export class ProcessEngineClientApi implements IProcessEngineClientApi {
  private _messageBusService: IMessageBusService = undefined;

  public config: any = undefined;

  constructor(messageBusService: IMessageBusService) {
    this._messageBusService = messageBusService;
  }

  public get messageBusService(): IMessageBusService {
    return this._messageBusService;
  }

  public async startProcess(processKey: string, processable: IProcessable, context: ExecutionContext, token?: any): Promise<IProcessInstance> {
    const processInstance = new ProcessInstance(processKey, this.messageBusService, processable);

    await processInstance.start(context, token);

    return processInstance;
  }
}
