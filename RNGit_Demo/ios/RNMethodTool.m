//
//  RNMethodTool.m
//  RNGit_Demo
//
//  Created by Liao PanPan on 2018/8/23.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RNMethodTool.h"
#import "AppDelegate.h"
@implementation RNMethodTool

RCT_EXPORT_MODULE()

-(NSArray<NSString *>*)supportedEvents
{
  return @[@"EventReminder"];
  
}

RCT_EXPORT_METHOD(pp_startObserving)
{
  [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(alertRNInfo:) name:@"pp123" object:nil];
}



RCT_EXPORT_METHOD(doSomething:(NSString *)string)
{
  
  dispatch_async(dispatch_get_main_queue(), ^{
    
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"我是iOS系统框  RN 调用 原生方法" message:string preferredStyle:UIAlertControllerStyleAlert];
    
 
    UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:nil];
    UIAlertAction *okAction = [UIAlertAction actionWithTitle:@"好的" style:UIAlertActionStyleDefault handler:nil];
    
    [alertController addAction:cancelAction];
    [alertController addAction:okAction];
    
    AppDelegate *delegate = (AppDelegate *)([UIApplication sharedApplication].delegate);
    
    [delegate.window.rootViewController presentViewController:alertController animated:YES completion:nil];
  });

}


-(void)alertRNInfo:(NSNotification *)noti
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    [self sendEventWithName:@"EventReminder" body:@{@"name":@"pp"}];

  });
  
}

+(void)emitMethod
{
  [[NSNotificationCenter defaultCenter]postNotificationName:@"pp123" object:nil];
}


@end
