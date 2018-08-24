//
//  OpenNativeModule.m
//  RNGit_Demo
//
//  Created by Liao PanPan on 2018/8/23.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "OpenNativeModule.h"
#import "AppDelegate.h"
#import "RNGitTestVC.h"
@implementation OpenNativeModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(doSomething:(NSString *)string)
{
//  NSLog(@"%@",string);
  
  dispatch_async(dispatch_get_main_queue(), ^{
    
    AppDelegate *delegate = (AppDelegate *)([UIApplication sharedApplication].delegate);
    UINavigationController *rootNav = delegate.navController;
    RNGitTestVC *nativeVC = [[RNGitTestVC alloc] init];
    nativeVC.RNStr = string;
    [rootNav pushViewController:nativeVC animated:YES];
    
  });

  
}

RCT_EXPORT_METHOD(doSomethingCallback:(NSString *)string callback:(RCTResponseSenderBlock)callback)
{

  
  NSLog(@"%@",string);
  callback(@[[NSNull null] ,@[@"test1", @"test2"]]); // 第一个error，第二个回调参数
  
  
}

@end
